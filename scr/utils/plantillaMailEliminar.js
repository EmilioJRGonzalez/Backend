const plantillaMailEliminar = `
<div style="font-family: Arial, sans-serif; margin: 0; padding: 20px;">
    <h2 style="color: #333;">Notificación de Eliminación de Producto</h2>
    <p style="color: #555;">Estimado usuario,</p>
    <p style="color: #555;">Le informamos que el siguiente producto ha sido eliminado:</p>
    
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>ID:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;">{{product_id}}</td>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Título:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">{{product_title}}</td>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Precio:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;">$ {{product_price}}</td>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Código:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">{{product_code}}</td>
        </tr>
    </table>
    
    <p style="color: #555;">Si tiene alguna pregunta, no dude en ponerse en contacto con nuestro equipo de soporte.</p>
    <p style="color: #555;">Atentamente,</p>
    <p style="color: #555;"><strong>Equipo de Ecommerce CoderHouse</strong></p>
</div>
`

export default plantillaMailEliminar