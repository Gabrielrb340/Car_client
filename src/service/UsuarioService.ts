import { LoginResult } from '../type/login';
import http from "./http";

const atualizarDados =async (data:any,userId:string,auth:string) => {
  var config = {
    headers: { 
      'Authorization': auth, 
      'Content-Type': 'application/json'
    }
  };
  return http.put(`/user/edit/${userId}`,data,config);
};
const criarUsuarioInscricao =async (data:any) => {
  return http.post(`/user/createoredit`,data);
};
const UsuarioService = {
    atualizarDados,
    criarUsuarioInscricao
};
export default UsuarioService;