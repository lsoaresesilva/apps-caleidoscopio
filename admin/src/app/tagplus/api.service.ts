import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { expand, map, concatMap } from 'rxjs/operators';
import {EMPTY} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  accessToken;


  constructor(private http: HttpClient) { }



  autenticar(codigo) {
    return new Observable(observer => {
      this.http.post("https://api.tagplus.com.br/oauth2/token",

        {
          grant_type: 'authorization_code',
          code: codigo,
          client_id: 'oX6QIY14uNv9QPbGeMQ0Itxw4RpYrMVm',
          client_secret: 'Y8Meain6g354Fzv8sfUTA4QxxxWAIGe0'
        }).subscribe(resultado => {

          localStorage.setItem("accessToken", resultado["access_token"]);

          observer.next();
          observer.complete();
        })
    })

  }

  produtos() {
    if (localStorage.getItem("accessToken") != null) {
      const opcoesHttp = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*'
        })
      };



      return this.http.get("https://api.tagplus.com.br/produtos?access_token=" + localStorage.getItem("accessToken"), opcoesHttp).subscribe(resultados => {
        console.log(resultados);
      })
    }

  }

  getDataCriacao(data) {
    if (typeof data === "string") {
      data = data.split(" ");
      data = data[0].split("-")
      return { ano: data[0], mes: data[1], dia: data[2] };
    }

  }

  httpRequestVendas(dados, dataInicio, dataTermino, vendasRealizadas): Observable<{
    resposta: any,
    next: object | null
  }>{
    return this.http.get(dados.url + localStorage.getItem("accessToken")).pipe(map(vendas=>({
      resposta:vendasRealizadas,
      next:this.next(dataInicio, dataTermino, vendas, vendasRealizadas, dados.page)
    })));

  }

  next(dataInicio, dataTermino, vendas, vendasRealizadas, page): object | null{
    if (vendas["length"] > 0) {
      for (let i = 0; i < vendas["length"]; i++) {
        let dataCriacao = this.getDataCriacao(vendas[i]["data_confirmacao"]);
        if (dataCriacao != undefined) {
          if ((dataCriacao.dia >= dataInicio.dia && dataCriacao.dia <= dataTermino.dia)  && 
              (dataCriacao.mes >= dataInicio.mes && dataCriacao.mes <= dataTermino.mes) && 
              (dataCriacao.ano >= dataInicio.ano && dataCriacao.ano <= dataTermino.ano) ) {
            vendasRealizadas.push(vendas[i])
          }
        }

      }
      ++page;
      return {url:"https://api.tagplus.com.br/vendas?page=" + page + "&per_page=400&fields=data_confirmacao,itens&access_token=", page:page}
    }else{
      return null;
    }
  }

  vendas(dataInicio, dataTermino) {
 
    let vendasR = [];
    const repos = this.httpRequestVendas({url:"https://api.tagplus.com.br/vendas?page=1&per_page=400&fields=data_confirmacao,itens&access_token=", page:1}, dataInicio, dataTermino, vendasR).pipe(
      expand(({ next }) => next ? this.httpRequestVendas(next, dataInicio, dataTermino, vendasR) : EMPTY),
      concatMap(({ resposta }) => resposta)
    );
    repos.subscribe(repo => console.log(vendasR.length));
    /*return new Observable(observer => {
      if (localStorage.getItem("accessToken") != null) {
        let request = this.httpRequestVendas(page)
        return request.pipe(expand(vendas=>{
          console.log("entrou aqui expand")
          if (vendas["length"] > 0) {
            for (let i = 0; i < vendas["length"]; i++) {
              let dataCriacao = this.getDataCriacao(vendas[i]["data_confirmacao"]);
              if (dataCriacao != undefined) {
                if (dataCriacao.dia == dia && dataCriacao.mes == mes && dataCriacao.ano == ano) {
                  vendasRealizadas.push(vendas[i])
                }
              }
      
            }
            return this.httpRequestVendas(++page);
          }else{
            return null;
          }
        }))
        /*this.http.get("https://api.tagplus.com.br/vendas?page=" + page + "&per_page=400&fields=data_confirmacao,itens&access_token=" + localStorage.getItem("accessToken")).pipe(expand((vendas, next) => {
          
        }))*/


        /*return this.http.get("https://api.tagplus.com.br/vendas?page="+page+"&per_page=400&fields=data_confirmacao,itens&access_token="+localStorage.getItem("accessToken")).subscribe(vendas=>{
          
            
            
            this.vendas(dia, mes, ano, ++page, vendasRealizadas)
          }
        //return this.http.get("https://api.tagplus.com.br/vendas?data_criacao="+dataEmissao+"%&fields=data_criacao&access_token="+localStorage.getItem("accessToken")).subscribe(resultados=>{
          
        })*/

      }
}
