export function BusinessMap() {
  return (
    <div className="w-full h-64 md:h-96">
      <iframe
        className="w-full h-full border-0"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495.56258963975876!2d3.3916168290390796!3d6.458063123923653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b1301fdaba9%3A0x913e22b85e708c99!2s34%20Binuyo%20St%2C%20Lagos%20Island%2C%20Lagos%20102273%2C%20Lagos!5e0!3m2!1sen!2sng!4v1747587648102!5m2!1sen!2sng"
        width="600"
        height="450"
        // style="border:0;"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
