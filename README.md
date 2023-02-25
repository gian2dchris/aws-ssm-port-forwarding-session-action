# AWS SSM Port Forwarding Session Action

This action starts a *local* port forwarding session for your github workflow and terminates it upon cleanup.

See also [aws-ssm-port-forwarding-session](https://github.com/skroutz-internal/aws-ssm-port-forwarding-session-action).

# Usage

See [action.yml](action.yml)

# Local Port Forward Example

Forward instance's `i-1234` port `8888`, on local port `8888`:
```yaml
steps:
...
- name: SSM Port Forward
  uses: skroutz-internal/aws-ssm-port-forwarding-session-action@v1.0.0
  with:
    target-id: 'i-1234'
    portNumber: 8888
    localPortNumber:  8888
- name: Curl Test
  run: |
    curl -v http://127.0.0.1:8888
```

# Limitations

As of current release the action only supports local port forwarding. Future releases may support remote or unix socket port forwarding SSM documents.

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
