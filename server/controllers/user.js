import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signIn = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		const compare = await bcrypt.compare(password, user.password);

		if (compare) {
			const token = jwt.sign(
				{ id: user._id, role: user.isAdmin },
				process.env.TOKEN
			);
			res
				.status(200)
				.json({ _id: user._id, name: user.name, email: user.email, token });
		} else {
			res.status(500).json({ message: "Incorrect password" });
		}
	} else {
		res.status(500).json({ message: "Incorrect email" });
	}
};

const register = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			name: name,
			email: email,
			password: hashedPassword,
		});
		const token = jwt.sign(
			{ id: user._id, role: user.isAdmin },
			process.env.TOKEN
		);
		res
			.status(200)
			.json({ message: "Account created Successfully", user, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export { signIn, register };
