import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";
import {Reservation} from "@/types";

interface KoalaWelcomeEmailProps {
    reserva: Reservation;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

export const EmailTemplate = ({
                                       reserva
                                  }: KoalaWelcomeEmailProps) => (
    <Html>
        <Head />
        <Preview>
            Reserva de Canchas UDLA
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={`https://reservas.chuvblocks.com/logo_clubes_udla_negro.png`}
                    width="170"
                    height="50"
                    alt="UDLA clubes"
                    style={logo}
                />
                <Text style={paragraph}>Estimad/a Estudiante</Text>
                <Text style={paragraph}>
                    Le informamos que su solicitud de reserva para el día [Fecha] a las [Hora] ha sido [Estado de la Reserva].
                    Gracias por utilizar el servicio de canchas de la UDLA.

                    Si tiene alguna pregunta o sugerencia, puede ponerse en contacto con David Flores a través de [correo de contacto].

                </Text>
                <Section style={btnContainer}>
                    <Button style={button} href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                        Realizar otra reserva
                    </Button>
                </Section>
                <Text style={paragraph}>
                    Atentamente,
                    <br />
                    UDLA CLUBES
                </Text>
                <Hr style={hr} />
                <Text style={footer}>
                    Universidad de Las Américas - Ecuador
                    Campus UDLA Park
                    Redondel del Ciclista, Antigua Vía a Nayó
                </Text>
            </Container>
        </Body>
    </Html>
);

export default EmailTemplate;

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const logo = {
    margin: "0 auto",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const btnContainer = {
    textAlign: "center" as const,
};

const button = {
    backgroundColor: "#5F51E8",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
};

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
};
