variable "aws_region" {
  description = "AWS deployment region"
  type        = string
  default     = "ap-south-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "rfq-auction-system"
}

variable "allowed_ssh_cidr" {
  description = "Your public IP allowed to access SSH"
  type        = string
}

variable "public_key_path" {
  description = "Path to SSH public key"
  type        = string
}