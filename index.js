const core = require("@actions/core");
const github = require("@actions/github");
const { SSMClient, StartSessionCommand } = require("@aws-sdk/client-ssm");

const run = async () => {
  try {
    console.log("Start SSM Port Forwarding Session");
    const client = new SSMClient({
			region: process.env.AWS_DEFAULT_REGION,
			customUserAgent: "gha".concat("-",github.context.repo.repo)
	});
    
    const params = SanitizeInputs();
    const command = new StartSessionCommand(params);
 
    const data = await client.send(command);
    core.saveState("session-id", data.SessionId);
  } catch (err) {
    console.error(err, err.stack);
    core.setFailed(err.message);
  }
};

function SanitizeInputs() {

  const _targetId = core.getInput('target-id', { required: true });
  const _portNumber = core.getInput('portNumber', { required: true });
  const _localPortNumber = core.getInput('localPortNumber', { required: true });
  
  const _documentName = 'AWS-StartPortForwardingSession';

  return {
    Target: _targetId,
    DocumentName: _documentName,
    Parameters: {
      'portNumber': [
        _portNumber,
      ],
      'localPortNumber': [
        _localPortNumber,
      ]
    },
    Reason: github.context.serverUrl + "/" + github.context.repo + "/actions/runs/" + github.context.runId.toString()
  };
}

run();
