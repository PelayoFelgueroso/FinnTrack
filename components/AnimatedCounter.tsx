'use client';
import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div className="w-full">
      <CountUp duration={1.5} end={amount} decimal="." decimals={2} suffix=" €" />
    </div>
  );
};

export default AnimatedCounter;
