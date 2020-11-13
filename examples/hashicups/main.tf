terraform {
  required_version = "~> 0.12.0"
}

provider "hashicups" {
  # username = "test"
  # password = "secret"
}


data "hashicups_coffees" "all" {}

output "number_coffees" {
  value = length(data.hashicups_coffees.all.coffees)
}

data "hashicups_order" "order" {
  id = 1
}

output "order" {
  value = data.hashicups_order.order
}
