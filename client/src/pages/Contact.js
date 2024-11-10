import React from "react";
import Layout from "./../components/Layout/Layout";

const Contact = () => {
    const contacts = [
        {
            id: 1,
            name: "John Doe",
            phone: "+1234567890",
            email: "john.doe@example.com",
            imgSrc: "/images/1.jpg", // Local image path
        },
        {
            id: 2,
            name: "Jane Smith",
            phone: "+0987654321",
            email: "jane.smith@example.com",
            imgSrc: "/images/2.jpg", // Local image path
        },
        {
            id: 3,
            name: "Alice Johnson",
            phone: "+1357924680",
            email: "alice.johnson@example.com",
            imgSrc: "/images/3.jpg", // Local image path
        },
        {
            id: 4,
            name: "Michael Brown",
            phone: "+1029384756",
            email: "michael.brown@example.com",
            imgSrc: "/images/m2.jpg", // Local image path
        },
    ];

    return (
        <Layout title={'Contact Us'}>
            <div
                style={{
                    backgroundColor: "#131914", // Darker, almost black with a faint green hue
                    padding: "0",
                    margin: "0",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <h1
                    className="text-center"
                    style={{ color: "#28a745", marginBottom: "50px" }}
                >
                    Contact Us
                </h1>

                <div className="d-flex flex-column align-items-center w-100">
                    {contacts.map((contact, index) => (
                        <div
                            key={contact.id}
                            style={{
                                display: "flex",
                                flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                                width: "80%", // Centers card and removes side padding
                                minHeight: "300px",
                                backgroundColor: "#1b1e1d", // Dark background for card with slight green tint
                                borderRadius: "15px",
                                overflow: "hidden",
                                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
                                marginBottom: "30px",
                            }}
                        >
                            <div
                                style={{
                                    flex: "1",
                                    backgroundImage: `url(${contact.imgSrc})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            ></div>

                            <div
                                style={{
                                    flex: "1",
                                    padding: "30px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    color: "#e0e0e0",
                                }}
                            >
                                <h2
                                    style={{
                                        color: "#28a745",
                                        marginBottom: "10px",
                                    }}
                                >
                                    {contact.name}
                                </h2>
                                <p style={{ marginBottom: "5px" }}>
                                    Phone: {contact.phone}
                                </p>
                                <p>Email: {contact.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
