import { useRecoilValue } from "recoil";
import { balanceAtom  } from "../atoms/balance";

export const useBalance = () : number => {
    const balance = useRecoilValue(balanceAtom);
    return balance;
}