terraform {
  required_version = "~> 0.12.0"
}

provider "hashicups" {
  # username = "education"
  # password = "test123"
}


data "hashicups_coffees" "all" {}

output "all_coffees" {
  value = data.hashicups_coffees.all.coffees
}
