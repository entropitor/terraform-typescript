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


resource "hashicups_order" "edu" {
  items {
    coffee {
      id = 3
    }
    quantity = 2
  }
  items {
    coffee {
      id = 2
    }
    quantity = 2
  }
}
output "edu_order" {
  value = hashicups_order.edu
}
