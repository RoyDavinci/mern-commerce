import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, process.env.TOKEN, (err, payload) => {
			if (err) {
				res.status(401).json({ message: "Invalid Token" });
			} else {
				req.user = payload;
				next();
			}
		});
	} else {
		res.status(401).json({ message: "Please pass a Header token" });
	}
};

export default authUser;
