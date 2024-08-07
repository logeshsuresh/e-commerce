import expressApp from "./expressApp";

const PORT = process.env.PORT || 3001;

export const StartServer = async () => {

    expressApp.listen(PORT, () => {
        console.log(`Server running on PORT : ${PORT}`);
    });

    process.on("uncaughtException", async (err) => {
        console.log(err);
        process.exit(1);
    });
}

StartServer().then(() => {
    console.log("Server is up!");
});