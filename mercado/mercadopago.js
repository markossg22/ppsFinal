import { MercadoPagoConfig, Preference } from "mercadopago";
import express from "express";
import cors from "cors";

const client = new MercadoPagoConfig({
    accessToken: "TEST-158667719404967-072319-72e0ecf5f48c118a19cefe9bfa39ae51-533521712",
});

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Soy el server:)");
});

app.post("/create_preference", async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "ARS",
                },
            ],
            back_urls: {
                success: "http://localhost:3000/admin/products",
                failure: "http://localhost:3000/admin/products",
                pending: "http://localhost:3000/admin/products"
            },
            auto_return: "approved",
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });

        res.json({
            id: result.id,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al rear la preferencia :(",
        });
    }
});

app.listen(port, () => {
    console.log('El servidor esta corriendo en el puerto 5000' );
});
