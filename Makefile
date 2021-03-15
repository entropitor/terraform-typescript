hashicups:
	rm -rf dist/hashicups
	docker build --build-arg BINARY=terraform-provider-hashicups . -o type=local,dest=dist/hashicups
	cd dist/hashicups && zip -r terraform-provider-hashicups_1.0.0_darwin_amd64.zip .
	mkdir -p ~/.terraform.d/plugins/registry.terraform.io/entropitor/hashicups
	mv dist/hashicups/terraform-provider-hashicups_1.0.0_darwin_amd64.zip ~/.terraform.d/plugins/registry.terraform.io/entropitor/hashicups/
	rm -rf dist/hashicups
