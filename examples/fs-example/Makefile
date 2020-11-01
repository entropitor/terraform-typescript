
PROVIDER_NAME=fs
VERSION=0.1.0

build:
	cd ../.. && yarn build:ts

# install: build
#   mkdir -p ~/.terraform.d/plugins/darwin_amd64
#   cp ../target/debug/terraform-plugin ./terraform-provider-${PROVIDER_NAME}_v${VERSION}

# clean:
#   rm ./terraform-provider-${PROVIDER_NAME}_* || true

run: build
	terraform init
	TF_LOG=trace terraform apply

stealth: build
	terraform init
	terraform plan
