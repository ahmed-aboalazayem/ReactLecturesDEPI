import { Linkedin, Mail, Github, Globe } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/60 backdrop-blur-xl border-t border-border mt-20 py-[50px] px-5 flex flex-col items-center gap-[30px] w-full text-foreground transition-colors duration-300">
      <div className="flex flex-col items-center gap-[30px]">
        
        {/* Profile Section */}
        <div className="flex flex-col items-center gap-[15px]">
          <img 
            src="https://github.com/ahmed-aboalazayem.png" 
            alt="Ahmed Aboalazayem" 
            className="w-[80px] h-[80px] rounded-full object-cover bg-gray-800 ring-2 ring-primary/20"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          
          <h2 className="text-[22px] text-center font-bold mt-4">
            <a 
              href="https://linkedin.com/in/ahmed-aboalazayem-664562326"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline bg-gradient-to-r from-primary to-[#ff7a88] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,46,66,0.5)] transition-opacity duration-300 hover:opacity-80"
            >
              <span className="text-primary">{"<"}</span>
              Ahmed Aboalazayem
              <span className="text-primary">{"/>"}</span>
            </a>
          </h2>
        </div>

        {/* Social Media Section */}
        <div className="flex justify-center items-center gap-[20px] flex-wrap">
          <a 
            title="LinkedIn Profile"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/ahmed-aboalazayem-664562326/"
            className="p-3 rounded-full border border-border bg-card/50 backdrop-blur-sm cursor-pointer transition-all duration-300 text-foreground hover:-translate-y-1.5 hover:scale-105 hover:text-primary hover:border-primary hover:shadow-[0_0_20px_rgba(255,46,66,0.2)] flex items-center justify-center group"
          >
            <Linkedin className="w-5 h-5 transition-colors group-hover:text-primary" />
          </a>

          <a 
            title="Email Me"
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:ahmedaboalazayem1@gmail.com"
            className="p-3 rounded-full border border-border bg-card/50 backdrop-blur-sm cursor-pointer transition-all duration-300 text-foreground hover:-translate-y-1.5 hover:scale-105 hover:text-primary hover:border-primary hover:shadow-[0_0_20px_rgba(255,46,66,0.2)] flex items-center justify-center group"
          >
            <Mail className="w-5 h-5 transition-colors group-hover:text-primary" />
          </a>

          <a 
            title="GitHub Profile"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ahmed-aboalazayem"
            className="p-3 rounded-full border border-border bg-card/50 backdrop-blur-sm cursor-pointer transition-all duration-300 text-foreground hover:-translate-y-1.5 hover:scale-105 hover:text-primary hover:border-primary hover:shadow-[0_0_20px_rgba(255,46,66,0.2)] flex items-center justify-center group"
          >
            <Github className="w-5 h-5 transition-colors group-hover:text-primary" />
          </a>

          <a 
            title="Personal Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            href="https://ahmed-aboalazayem.github.io/DEPI-portfolio/"
            className="p-3 rounded-full border border-border bg-card/50 backdrop-blur-sm cursor-pointer transition-all duration-300 text-foreground hover:-translate-y-1.5 hover:scale-105 hover:text-primary hover:border-primary hover:shadow-[0_0_20px_rgba(255,46,66,0.2)] flex items-center justify-center group"
          >
            <Globe className="w-5 h-5 transition-colors group-hover:text-primary" />
          </a>
        </div>
      </div>

      <p className="text-muted-foreground text-sm text-center">
        © <span>{currentYear}</span> Ahmed Aboalazayem. All Rights Reserved.
      </p>
    </footer>
  );
}
