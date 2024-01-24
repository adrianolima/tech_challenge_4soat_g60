export default interface ClientModel {
  id: number;
  cpf: string;
  email: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
};