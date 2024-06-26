// src/components/Tabs.jsx
import React, { useState } from 'react';
import '../../styles/detail-tabs.css'

const DeatailTabs = ({carName, imgUrl}) => {
    const [activeTab, setActiveTab] = useState('Description');
    console.log(imgUrl)

    const removeColorFromImageUrl = (imageUrl) => {
        if (!imageUrl) return '';
        console.log(imageUrl)
        const lastIndex = imageUrl.lastIndexOf('.');
        const underscoreIndex = imageUrl.lastIndexOf('_');
        const filename = underscoreIndex > -1 ? imageUrl.substring(0, underscoreIndex) : imageUrl.substring(0, lastIndex);
        const extension = imageUrl.substring(lastIndex);
        return `${filename}${extension}`;
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Description':
                return(
                    <div>
                <img src={removeColorFromImageUrl(imgUrl)} alt="" className="w-100" style={{marginBottom:'2%'}}/>
                <p>Introducing the <b>{carName}</b>, a pinnacle of automotive innovation and sustainable luxury. This electric sedan redefines the driving experience with its seamless blend of cutting-edge technology and elegant design. Equipped with a powerful electric motor, the <b>{carName}</b> delivers not only impressive performance but also sets a new standard for eco-friendly driving, emitting zero emissions while cruising effortlessly down city streets or winding country roads.<br/>
                <br/>
                Step inside, and you'll find a sanctuary of sophistication and comfort. The interior boasts premium materials meticulously crafted to enhance every journey. Luxurious features like GPS Navigation guide you effortlessly through unfamiliar territories, while Heated Seats envelop you in warmth during chilly mornings. The spacious cabin accommodates passengers with ease, offering ample legroom and customizable seating options for optimal comfort on long-distance trips.<br/>
                <br/>
                Beyond its striking exterior and plush interior, the <b>{carName}</b> stands as a testament to safety and advanced driver-assistance systems. From collision avoidance technology to adaptive cruise control, every aspect of this sedan is designed to prioritize your safety and peace of mind. Whether navigating urban traffic or embarking on a cross-country adventure, the <b>{carName}</b> ensures a secure and serene ride for all occupants.<br/>
                <br/>
                Performance is at the heart of the <b>{carName}</b>'s allure. With lightning-fast acceleration and precise handling, every drive becomes an exhilarating experience. The responsive electric motor propels you from 0 to 60 mph in seconds, effortlessly merging into traffic and navigating tight turns with confidence. Coupled with regenerative braking, which harnesses kinetic energy to recharge the battery while slowing down, the <b>{carName}</b> maximizes efficiency without compromising on performance.<br/>
                </p>
                    </div>
                );
            case 'Additional Information':
                return <p>
                Innovative technology intersects with sustainable design in the <b>{carName}</b>. Its sleek profile not only cuts through the air with minimal resistance but also showcases a commitment to reducing carbon footprint without sacrificing style. Charging the <b>{carName}</b> is convenient and efficient, whether at home with a Tesla Wall Connector or on the go at a Supercharger station, providing peace of mind and freedom to explore.<br/>
                <br/>
                Elevate your driving experience with the <b>{carName}</b>, where luxury meets sustainability and performance meets innovation. Embrace the future of driving today with a sedan that redefines what it means to drive electric..</p>;
            case 'Reviews':
                return <p>Reviews content goes here...</p>;
            default:
                return null;
        }
    };

    return (
        <div className="tabs">
            <div className="tab-buttons">
                <button onClick={() => setActiveTab('Description')} className={activeTab === 'Description' ? 'active' : ''}><b>Description</b></button>
                <button onClick={() => setActiveTab('Additional Information')} className={activeTab === 'Additional Information' ? 'active' : ''}><b>Additional Information</b></button>
                <button onClick={() => setActiveTab('Reviews')} className={activeTab === 'Reviews' ? 'active' : ''}><b>Review</b></button>
            </div>
            <div className="tab-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default DeatailTabs;
