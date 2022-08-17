import { Inscricao } from './../../../../api/src/entity/Inscricao';
import { LoginResult } from './../type/login';
import http from "./http";

const login =async (data:any) => {
  return http.post<LoginResult>("/inscricao/login",data);
};
const InscricaoService = {
  login
};
export default InscricaoService;