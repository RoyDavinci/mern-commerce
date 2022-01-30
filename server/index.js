import express from "express";

const app = express();

const PORT = process.env.PORT || 3800;

app.listen(PORT, () => {
	console.log(`Express app listening in on http://localhost:${PORT}`);
});
