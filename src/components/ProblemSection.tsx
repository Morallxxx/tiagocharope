import { useState, useEffect } from 'react';
import { ShieldX, Clock, User, AlertTriangle } from "lucide-react";

const ProblemSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('problem-section');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section id="problem-section" className="py-20 bg-gray-50">
      <div className="section-container">
        <h2 className="section-heading text-center">
          A <span className="text-[#df2026] font-bold">Síndrome</span> da Porta Fechada™
        </h2>
        <p className="section-subheading text-center">
          Você conhece bem essa história…
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {[
            {
              icon: <AlertTriangle className="h-12 w-12 text-a1red" />,
              title: "Seu filho está ardendo em febre",
              description: "A preocupação toma conta e você precisa de ajuda médica urgente."
            },
            {
              icon: <Clock className="h-12 w-12 text-a1red" />,
              title: "A fila dá volta no quarteirão",
              description: "Horas de espera com uma criança doente no colo, exposta a mais doenças."
            },
            {
              icon: <User className="h-12 w-12 text-a1red" />,
              title: "O médico mal olha para você",
              description: "É só uma virose. Dá dipirona e observa. Sem atenção adequada."
            },
            {
              icon: <ShieldX className="h-12 w-12 text-a1red" />,
              title: "Você volta para casa desamparada",
              description: "Com medo, cansaço e nenhuma resposta. Se sentindo invisível e ignorada."
            }
          ].map((item, index) => (
            <div 
              key={index}
              className={`feature-card flex flex-col items-center text-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#013e7d]">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>  

        {/* BLOCO DA OPORTUNIDADE */}
        <div className={`mt-16 bg-gradient-to-r from-white to-white p-8 rounded-xl shadow-2xl max-w-3xl mx-auto text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
          <h3 className="text-3xl font-extrabold text-[#013e7d] mb-6">A OPORTUNIDADE</h3>
          <div className="flex flex-col items-center space-y-4">
            {[
              "Sem sair de casa.",
              "Sem pegar ônibus.",
              "Sem arrastar criança no colo.",
              "Sem depender de sorte."
            ].map((text, i) => (
              <span key={i} className="block text-lg font-medium text-[#013e7d] bg-[#e6eef6] px-5 py-2 rounded-full shadow-md">
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* BOTÃO DE AÇÃO */}
        <div className="mt-8 text-center">
          <a
            href="#assinar"
            className="cta-button inline-block px-8 py-4 bg-[#013e7d] text-white font-bold rounded-lg shadow-lg hover:bg-blue-900 transition-transform transform hover:scale-105"
          >
            QUERO ESTA FACILIDADE
          </a>
        </div>

      </div>
    </section>
  );
};

export default ProblemSection;
