module.exports = `
<body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Confirmación de Compra</h2>
        <p>A continuación, te presentamos los detalles:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
                <td style="border: 1px solid #ddd; padding: 10px;">Código de Compra:</td>
                <td style="border: 1px solid #ddd; padding: 10px;">{{code}}</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 10px;">Fecha y Hora de Compra:</td>
                <td style="border: 1px solid #ddd; padding: 10px;">{{purchase_datetime}}</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 10px;">Monto Total:</td>
                <td style="border: 1px solid #ddd; padding: 10px;">$ {{amount}}</td>
            </tr>
        </table>

        <p>¡Gracias por tu compra!</p>
        <p>Si tenes alguna pregunta o inquietud, no dudes en contactarnos.</p>

        <p>Saludos,<br>Equipo de Ecommerce CoderHouse</p>
    </div>
</body>
`