import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductActions from '../components/ProductActions';

export default function DealsCard({ product }) {
  // Generate random time for countdown
  const [timeLeft, setTimeLeft] = useState({
    days: Math.floor(Math.random() * 60),
    hours: Math.floor(Math.random() * 24),
    minutes: Math.floor(Math.random() * 60),
    seconds: Math.floor(Math.random() * 60),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const totalSeconds =
          prev.days * 86400 + prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;

        if (totalSeconds <= 0) {
          clearInterval(timer); // Stop the timer when it reaches zero
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <div className="deals-cart">
      <div className="deals-cart__image -ibg--contain sale">
        <ProductActions product={product}/>
        <Link to={`/product/${product.id}`}><img src={product.image} alt={product.name} /></Link>
      </div>
      <div className="deals-cart__details">
        <h4 className="deals-cart__name">{product.name}</h4>
        <div className="deals-cart__price">
          <span className="old-price">
            ${(product.price - (product.price * 15) / 100).toFixed(2)}
          </span>
          <span className="price">${product.price.toFixed(2)}</span>
        </div>
        <div className="deals-cart__stock">Available: <span>{product.stock}</span></div>
      </div>
      <div className="deals-cart__countdown">
        <div><span>{String(timeLeft.days).padStart(2, '0')}</span><span>Days</span></div>
        <div><span>{String(timeLeft.hours).padStart(2, '0')}</span><span>Hours</span></div>
        <div><span>{String(timeLeft.minutes).padStart(2, '0')}</span><span>Mins</span></div>
        <div><span>{String(timeLeft.seconds).padStart(2, '0')}</span><span>Secs</span></div>
      </div>
    </div>
  );
}
