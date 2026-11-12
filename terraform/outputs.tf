output "ec2_instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.rfq_server.id
}

output "ec2_public_ip" {
  description = "EC2 public IP address"
  value       = aws_instance.rfq_server.public_ip
}

output "ec2_public_dns" {
  description = "EC2 public DNS"
  value       = aws_instance.rfq_server.public_dns
}

output "ssh_command" {
  description = "SSH connection command"
  value       = "ssh -i ~/.ssh/rfq-terraform-key ec2-user@${aws_instance.rfq_server.public_ip}"
}