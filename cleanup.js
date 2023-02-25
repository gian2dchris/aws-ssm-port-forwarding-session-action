const core = require("@actions/core");
const github = require("@actions/github");
const { SSMClient, TerminateSessionCommand } = require("@aws-sdk/client-ssm");

const run = async () => {
  try {
    console.log("Terminate SSM Port Forwarding Session");
    const client = new SSMClient({region: process.env.AWS_DEFAULT_REGION, customUserAgent: "gha".concat("-",github.context.repo.repo)});

    const params = SanitizeInputs();
    const command = new TerminateSessionCommand(params);
    const data = client.send(command);
    
    console.log("Data %s", data);
  } catch (err) {
    console.error(err, err.stack);
    core.setFailed(err.message);
  }
};

function SanitizeInputs() {
  
  const _sessionId = core.getState("session-id");
  console.log("Session Id %s", _sessionId);
  
  return {
    SessionId: _sessionId,
  };
}

run();