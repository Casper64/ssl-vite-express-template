# Passkeys example

## Usage

### Local SSL certificates

1. Install [mkcert](https://github.com/FiloSottile/mkcert) which allows your local browser to trust
   user generated certificates.

2. Install the CA store in your browser (might need to be ran with superuser privileges)

```shell
mkcert -install
```

2. Create certificate for `localhost` domain.

```shell
cd certs && mkcert localhost
```

### Install dependencies

```shell
npm i
```

### Start dev servers

```shell
npm run dev
```

You should be able to access the frontend at [https://localhost:3000](https://localhost:3000)
and the express backend at [https://localhost:3001](https://localhost:3001)
