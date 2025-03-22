import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { standardStyles } from "@/lib/theme-config";

export interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean;
  hover3d?: boolean;
  glare?: boolean;
  children: React.ReactNode;
}

const EnhancedCard = forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, gradient = false, hover3d = false, glare = false, children, ...props }, ref) => {
    
    const cardClassName = cn(
      "relative overflow-hidden transition-all duration-300",
      gradient && standardStyles.cardGlow,
      className
    );
    
    if (hover3d) {
      return (
        <motion.div
          className={cardClassName}
          ref={ref as React.Ref<HTMLDivElement>}
          {...(props as any)}
          whileHover={{ scale: 1.02 }}
          initial={{ boxShadow: "0 0 0 rgba(0, 0, 0, 0)" }}
          whileInView={{
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            transition: { delay: 0.2, duration: 0.5 }
          }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">{children}</div>
        </motion.div>
      );
    }
    
    return (
      <Card 
        className={cardClassName}
        ref={ref}
        {...props}
      >
        {glare && (
          <div className="absolute inset-0 w-full h-full">
            <div 
              className="absolute -inset-[150%] h-[500%] w-[100%] rotate-45 bg-gradient-to-r from-transparent via-primary/15 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-all duration-1000 ease-in-out"
            ></div>
          </div>
        )}
        <div className="relative">
          {children}
        </div>
      </Card>
    );
  }
);

EnhancedCard.displayName = "EnhancedCard";

export {
  EnhancedCard,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
};
