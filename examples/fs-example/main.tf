terraform {
  required_version = ">= 0.12.0"
}

provider "fs" {
  root_dir = "/tmp/tf-experiment"
}

resource "fs_file" "quux" {
  file_name = "quux.json"
  body = {
    nb_foos = 6
  }
}
