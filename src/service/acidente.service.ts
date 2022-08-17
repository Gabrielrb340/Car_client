import { Inscricao } from './../../../../api/src/entity/Inscricao';
import { LoginResult } from './../type/login';
import http from "./http";

const criarAcidente =async (data:any,inscricaoId:string,auth:string) => {
    var config = {
      headers: { 
        'Authorization': auth, 
        'Content-Type': 'application/json'
      }
    };
    data.inscricaoId= inscricaoId;
  return http.post<boolean>(`/acidente/create`,data);
};
const  AcidenteService ={
    criarAcidente
}
export default AcidenteService;