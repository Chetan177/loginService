const PROTO_PATH = "../login.proto";

var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String
});

const LoginService = grpc.loadPackageDefinition(packageDefinition).LoginService;
const loginClient = new LoginService(
	"localhost:30043",
	grpc.credentials.createInsecure()
);

module.exports = loginClient;