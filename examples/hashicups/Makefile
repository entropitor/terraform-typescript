build:
	cd ../.. && yarn build:ts

clean:
	rm terraform.tfstate*

debug: build
	terraform init
	TF_LOG=trace terraform apply

tf: build
	terraform init
	terraform apply

api:
	cd docker-compose && docker-compose up
