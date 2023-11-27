import React from 'react';
import '../assets/styles/containers/FooterSection.css';

const FooterSection = () => {
    const currentYear: string = (new Date).toISOString().split('-')[0];

    return (
        <section className="section footer-section">
            <p>© Bart van Elferen - {currentYear}</p>
        </section>
    );
};

export default FooterSection;