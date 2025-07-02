require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const purchaseRoutes = require("./routes/purchaseRoutes");
const baseRoutes = require("./routes/baseRoutes");
const assetRoutes = require("./routes/assetRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const transferRoutes = require('./routes/transferRoutes');
const assignmentRoutes = require("./routes/assignmentRoutes");
const expenditureRoutes = require("./routes/expenditureRoutes");

app.use("/api/purchases", purchaseRoutes);
app.use("/api/bases", baseRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use('/api/transfers', transferRoutes); 
app.use("/api/assignments", assignmentRoutes);
app.use("/api/expenditures", expenditureRoutes);

app.get("/", (req, res) => {
  res.send("Military Asset Management Server Running!");
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
