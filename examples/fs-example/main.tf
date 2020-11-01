terraform {
  required_version = ">= 0.12.0"
}

provider "fs" {
  foo = "bar"
}

resource "fs_file" "quux" {
  nb_foos = 5
}
