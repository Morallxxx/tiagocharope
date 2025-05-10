import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const PricingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 10, seconds: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("assinar");
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Checar logo no carregamento

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { hours, minutes, seconds } = prev;
        seconds -= 1;

        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }
        if (hours < 0) {
          hours = 0;
          minutes = 0;
          seconds = 0;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="assinar" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="section-container">
        <h2 className="section-heading text-center">
          Garanta sua paz de espírito agora
        </h2>

        {/* Cronômetro */}
        <div className="max-w-md mx-auto mt-4 mb-10 bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
          <p className="text-gray-700 mb-2 font-medium">Esta oferta expira em:</p>
          <div className="flex justify-center items-center gap-4">
            {["hours", "minutes", "seconds"].map((unit, idx) => (
              <div key={unit} className="flex items-center">
                <div className="bg-red-600 text-white px-3 py-2 rounded-lg">
                  <span className="text-2xl font-bold">
                    {String(countdown[unit]).padStart(2, "0")}
                  </span>
                  <p className="text-xs mt-1 capitalize">{unit}</p>
                </div>
                {idx < 2 && <span className="text-2xl font-bold text-gray-700 mx-2">:</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Planos */}
        <div className={`flex flex-col md:flex-row gap-6 max-w-6xl mx-auto mt-12 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
          {/* Plano 1 mês */}
          <PlanCard
            title="Plano Mensal"
            description="1 mês de atendimento"
            price="79"
            originalPrice="99"
            discount="20% OFF"
            benefits={["GARANTIA DE 30 DIAS"]}
            link="https://pay.kiwify.com.br/vkfzEPb"
          />

          {/* Plano 6 meses - destaque */}
          <PlanCard
            title="Melhor Oferta"
            description="6 meses de atendimento"
            price="49,50"
            originalPrice="594"
            totalPrice="297"
            discount="50% OFF"
            highlight
            benefits={["MAIOR DESCONTO", "GARANTIA DE 30 DIAS"]}
            link="https://pay.kiwify.com.br/HtisneU"
          />

          {/* Plano 3 meses */}
          <PlanCard
            title="Boa Oferta"
            description="3 meses de atendimento"
            price="69"
            originalPrice="297"
            totalPrice="207"
            discount="30% OFF"
            benefits={["GARANTIA DE 30 DIAS"]}
            link="https://pay.kiwify.com.br/EdNxejR"
          />
        </div>

        {/* Bônus Exclusivo */}
        <div className={`max-w-4xl mx-auto mt-12 mb-8 ${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
          <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
            <h4 className="text-2xl font-bold text-green-700 text-center mb-4">🎁 BÔNUS EXCLUSIVO DE BOAS-VINDAS</h4>
            <p className="text-center text-red-600 font-bold text-sm mb-6">(por tempo limitado)</p>

            <BonusItem text="Serviço de Assistência Funerária Zelo" subtext="Sim — até nos piores dias, você não estará sozinha(o)." />
            <BonusItem text="Acesso Imediato ao App e à Central Médica 24h" subtext="Consulta em minutos, direto do seu celular." />
            <BonusItem text="Garantia Total de Satisfação por 30 Dias" subtext="Usou, não gostou? Cancelou. E pronto. Sem dor de cabeça. Sem estresse." />
          </div>
        </div>

        {/* Garantia */}
        <div className={`max-w-4xl mx-auto mt-12 ${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.5s" }}>
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-a1blue text-center mb-4">GARANTIA</h4>
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-a1green mr-2" />
              <span className="font-semibold">Garantia de 30 Dias Sem Risco</span>
            </div>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-4">
              Se você não sentir na pele que isso é uma verdadeira proteção para você e sua família, receba seu dinheiro de volta imediatamente, sem perguntas ou enrolação.
            </p>
            <p className="text-gray-600 text-center font-medium max-w-2xl mx-auto mb-2">
              Sem burocracia. Sem taxa. Sem letras miúdas.
            </p>
            <p className="text-gray-700 text-center font-bold max-w-2xl mx-auto">
              Você tem tudo a ganhar — e nada a perder.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// COMPONENTES AUXILIARES

const PlanCard = ({ title, description, price, originalPrice, totalPrice, discount, benefits, link, highlight }) => (
  <div className={`flex-1 bg-white rounded-xl overflow-hidden shadow-lg border-2 ${highlight ? "border-green-500 shadow-2xl transform md:scale-105 md:-translate-y-2 z-10" : "border-gray-200"}`}>
    <div className={`${highlight ? "bg-green-500 text-white" : "bg-blue-100 text-gray-800"} p-4 text-center`}>
      <h3 className="font-bold">{title}</h3>
      <p className="font-bold">{description}</p>
    </div>
    <div className="p-6 flex flex-col items-center">
      <div className="my-4">
        <img src="/uploads/mockup.webp" alt={title} className="h-32 object-contain" />
      </div>
      <div className="flex items-end mt-4">
        <span className="text-3xl font-bold">R${price}</span>
        <span className="text-sm text-gray-500 ml-1 mb-1">/mês</span>
      </div>
      <div className="my-4 w-full">
        <div className="flex items-center justify-center text-sm text-green-700 mb-2">
          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          ECONOMIZE {discount}
        </div>
        {benefits.map((benefit, idx) => (
          <div key={idx} className="flex items-center justify-center text-sm text-gray-600 mb-1">
            <span className="inline-block w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
            {benefit}
          </div>
        ))}
      </div>
      <a href={link} target="_blank" rel="noopener noreferrer" className="w-full bg-yellow-400 hover:bg-yellow-500 text-center py-3 rounded font-bold text-gray-800 mb-4">
        ASSINAR AGORA
      </a>
      <div className="flex justify-center gap-2 mb-2">
        <img src="/uploads/visa.png" alt="Visa" className="h-6" />
        <img src="/uploads/mastercard.png" alt="MasterCard" className="h-6" />
        <img src="/uploads/amex.png" alt="Amex" className="h-6" />
      </div>
      <div className="text-center text-sm">
        <p className="font-bold">TOTAL: <span className="line-through">R${originalPrice}</span> R${totalPrice || price}</p>
      </div>
    </div>
  </div>
);

const BonusItem = ({ text, subtext }) => (
  <div className="flex items-start bg-white p-4 rounded-lg shadow-sm mb-4">
    <div className="flex-shrink-0 text-green-600 font-bold mr-3">✅</div>
    <div>
      <p className="font-bold text-gray-800">{text}</p>
      <p className="text-gray-600">{subtext}</p>
    </div>
  </div>
);

export default PricingSection;

