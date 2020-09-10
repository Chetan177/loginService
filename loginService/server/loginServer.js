const PROTO_PATH = "../login.proto";

var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String
});

var loginProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const users = [
	{
        username : "JohnBolton",
		password : "xyz123"
		
	},
	{
        username : "Chetan",
		password : "xyz123"
	}
];

server.addService(loginProto.LoginService.service, {

	login: (call, callback) => {
		let user = users.find(n => n.username == call.request.username);

		if (user) {
			callback(null, user);
		} else {
			callback({
				code: grpc.status.NOT_FOUND,
				details: "Not found"
			});
		}
    },
    signUp: (call, callback) =>{}
});

server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:30043");
server.start();
