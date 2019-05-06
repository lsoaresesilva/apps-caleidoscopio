import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

import { expand, map, concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import Venda from '../models/venda';
import Query from '../models/firestore/query';
import { Document, Collection } from '../models/firestore/document';
import VendasPeriodo from '../models/vendaPeriodo';
import EstoqueCategorias from '../models/estoqueProdutos';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  accessToken;
  page;


  constructor(private http: HttpClient) { this.page = 1; }



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

  /*totalVendasPorCategoria(vendas, produtosAgrupados) {
    if (vendas != undefined && vendas.length > 0 && produtosAgrupados != undefined) {
      let totalVendasPorCategoria = {}

      vendas.forEach(venda => {
        if (venda["itens"] != undefined && venda["itens"].length > 0) {
          venda["itens"].forEach(item => {
            if (item.produto != undefined && item.produto.id != undefined) {

              // Para cada produto, preciso saber se 


              for (let key in produtosAgrupados) {
                if (produtosAgrupados[key] != undefined && produtosAgrupados[key].length > 0) {




                  for (let i = 0; i < produtosAgrupados[key].length; i++) {
                    if (produtosAgrupados[key][i].id == item.produto.id) {
                      if (!totalVendasPorCategoria.hasOwnProperty(key)) {
                        totalVendasPorCategoria[key] = 0;
                      }
                      if (item["qtd"] != undefined)
                        totalVendasPorCategoria[key] = totalVendasPorCategoria[key] + item.qtd;
                    }
                  }
                }
              }

            }
          })
        }

      })

      return totalVendasPorCategoria;
    }

  }*/

  calcularEstoquePorCategoria(atualizarBanco) {
    return new Observable(observer => {

      if (atualizarBanco) {
        let estoqueCategoria = [];
        EstoqueCategorias.deleteAll().subscribe(r => {
          const repos = this.httpRequestEstoqueCategoria({ url: "https://api.tagplus.com.br/produtos?page=1&per_page=200&fields=categoria,qtd_revenda&access_token=", page: 1 }, estoqueCategoria).pipe(
            expand(({ next }) => next ? this.httpRequestEstoqueCategoria(next, estoqueCategoria) : EMPTY),
            concatMap(({ resposta }) => resposta)
          );
          repos.subscribe(repo => { }, err => { observer.error(err) }, () => {
            // TODO: problema: data inicio e termino estão indo apenas como objeto.. e não seus valores
            let categorias = {}
            for(let categoria in estoqueCategoria){
                categorias[categoria] = estoqueCategoria[categoria]
              }
              
            
            let e = new EstoqueCategorias(null, categorias);
            e.save().subscribe(resultado => {
              observer.next(estoqueCategoria);
              observer.complete()
            })

          });
        })

      } else {
        EstoqueCategorias.getAll().subscribe(estoque => {
          if (estoque.length > 0) {
            if (estoque[0].categorias != undefined) {
              observer.next(estoque[0].categorias);
              observer.complete()
            }
          }
        })
      }


    })
  }

  httpRequestEstoqueCategoria(dados, estoqueCategoria): Observable<{
    resposta: any,
    next: object | null
  }> {
    return this.http.get(dados.url + localStorage.getItem("accessToken")).pipe(map(produtos => ({
      resposta: estoqueCategoria,
      next: this.nextEstoqueCategoria(produtos, estoqueCategoria, this.page)
    })));

  }

  nextEstoqueCategoria(produtos, estoqueCategoria, page): object | null {
    if (produtos["length"] > 0) {
      for (let i = 0; i < produtos["length"]; i++) {

        if (produtos[i]["categoria"] != undefined && produtos[i]["categoria"]["descricao"] != undefined && produtos[i]["qtd_revenda"] != undefined) {
          if (estoqueCategoria[produtos[i]["categoria"]["descricao"]] == undefined) {
            estoqueCategoria[produtos[i]["categoria"]["descricao"]] = 0;
          }


          estoqueCategoria[produtos[i]["categoria"]["descricao"]] += produtos[i]["qtd_revenda"];
        }
      }
      ++this.page;
      return { url: "https://api.tagplus.com.br/produtos?page=" + page + "&per_page=200&fields=categoria,qtd_revenda&access_token=", page: this.page }
    } else {
      return null;
    }
  }

  isEmpty(obj) { // usado para verificar se um objeto possui chaves
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }


  //agruparVendasPorCategoria(vendas: any[]) {
  agruparVendasPorCategoria(vendasAgrupadasPorPeriodo) {

    return new Observable(observer => {

      let produtosCadastrados = [];

      if (vendasAgrupadasPorPeriodo == undefined) {
        observer.error(new Error("Vendas foi um array vazio."));
      } else {
        let consultasProdutos = {}


        for (let j = 0; j < vendasAgrupadasPorPeriodo.length; j++) {
          // TODO: cada produto carregado deve ser colocado em um array. Se ele for requisitado, primeira vez busca da net, segunda coloca no array          
          for (let i = 0; i < vendasAgrupadasPorPeriodo[j]["vendas"].length; i++) {
            if (vendasAgrupadasPorPeriodo[j]["vendas"][i]["itens"] != undefined && vendasAgrupadasPorPeriodo[j]["vendas"][i]["itens"].length > 0) {
              vendasAgrupadasPorPeriodo[j]["vendas"][i]["itens"].forEach(item => {
                if (item.produto != undefined && item.produto.id != undefined) {
                  if (!consultasProdutos.hasOwnProperty(item.produto.id)) {

                    let produto = item.produto;
                    consultasProdutos[item.produto.id] = this.http.get("https://api.tagplus.com.br/produtos?id=" + produto.id + "&fields=categoria,qtd_revenda&access_token=" + localStorage.getItem("accessToken"));

                  }
                }
              })
            }
          }
        }

        if (!this.isEmpty(consultasProdutos)) {
          // TODO: esse grupo agora vai considerar também o período.. será da seguinte forma: [0].categorias[0] = 50

          forkJoin(consultasProdutos).subscribe(produtos => {

            let produtosBancoDados: {} = produtos;

            // percorrer vendas agrupadas
            for (let j = 0; j < vendasAgrupadasPorPeriodo.length; j++) {
              let grupoProdutos = {};
              // TODO: cada produto carregado deve ser colocado em um array. Se ele for requisitado, primeira vez busca da net, segunda coloca no array          
              for (let i = 0; i < vendasAgrupadasPorPeriodo[j]["vendas"].length; i++) {
                if (vendasAgrupadasPorPeriodo[j]["vendas"][i]["itens"] != undefined) {
                  for (let x = 0; x < vendasAgrupadasPorPeriodo[j]["vendas"][i]["itens"].length; x++) {
                    for (let id in produtosBancoDados) {

                      if (produtosBancoDados[id] != undefined && produtosBancoDados[id].length > 0 && produtosBancoDados[id][0]["categoria"] != undefined) {

                        let idProdutoBanco = produtosBancoDados[id][0]["codigo"];
                        let idProdutoItem = vendasAgrupadasPorPeriodo[j]["vendas"][i]["itens"][x]["produto"]["codigo"];
                        if (vendasAgrupadasPorPeriodo[j]["vendas"][i]["itens"][x]["produto"]["codigo"] != undefined && produtosBancoDados[id][0]["codigo"]) {
                          if (produtosBancoDados[id][0]["codigo"] == vendasAgrupadasPorPeriodo[j]["vendas"][i]["itens"][x]["produto"]["codigo"]) {

                            let nomeCategoria: string = produtosBancoDados[id][0]["categoria"]["descricao"]
                            if (!grupoProdutos.hasOwnProperty(nomeCategoria)) {

                              grupoProdutos[nomeCategoria] = 0;
                            }

                            grupoProdutos[nomeCategoria] = grupoProdutos[nomeCategoria] + 1;
                          }
                        }

                      }
                      // Agrupar por categoria
                    }
                  }
                }




              }
              vendasAgrupadasPorPeriodo[j]["categorias"] = grupoProdutos;

            }



            observer.next(vendasAgrupadasPorPeriodo);
            observer.complete();
          })

        } else {
          observer.next({});
          observer.complete();
        }
      }
    })


  }

  /**
   * Transforma a data de criação de uma venda para um formato Javascript.
   * @param data 
   */
  getDataCriacao(data) {
    if (typeof data === "string") {
      data = data.split(" ");
      data = data[0].split("-")
      return { ano: data[0], mes: data[1] - 1, dia: data[2] }; // mês -1, pois no javascript o date começa em 0
    }

  }

  //httpRequestVendas(dados, dataInicio, dataTermino, vendasRealizadas): Observable<{
  httpRequestVendas(url): Observable<{
    vendas: any,
    next: string | null
  }> {

    url = url + localStorage.getItem("accessToken");
    return this.http.get(url).pipe(map(vendas => {
      if (vendas["length"] > 0) {
        this.page += 1;
        return { vendas: vendas, next: "https://api.tagplus.com.br/vendas?page=" + this.page + "&per_page=400&fields=data_confirmacao,itens&access_token=" }
      } else {
        return { vendas: null, next: null };
      }
    }));

  }

  /**
   * Organiza todas as vendas realizadas pelos períodos que foram solicitados. Vendas em outros periodos, que não os informados, serão ignoradas.
   * @param vendas 
   * @param periodos 
   */
  agruparPorPeriodos(vendas, periodos: any[]) {
    //let vendasAgrupadas = []

    periodos.forEach(periodo => {

      periodo["vendas"] = []

    });


    if (vendas.length > 0) {
      for (let i = 0; i <= vendas.length; i++) {
        if (vendas[i] != undefined) {
          let dataCriacao = this.getDataCriacao(vendas[i]["data_confirmacao"]);

          if (dataCriacao != undefined) {
            let dataC = new Date(dataCriacao.ano, dataCriacao.mes, dataCriacao.dia);

            for (let j = 0; j < periodos.length; j++) {
              // mudar para for tradicional e usar o break

              let dI = new Date(periodos[j].dataInicio.ano, periodos[j].dataInicio.mes, periodos[j].dataInicio.dia);
              let dT = new Date(periodos[j].dataTermino.ano, periodos[j].dataTermino.mes, periodos[j].dataTermino.dia); // essa transformação está com problema


              if (dataC.getTime() >= dI.getTime() && dataC.getTime() <= dT.getTime()) {
                periodos[j]["vendas"].push(vendas[i]);
                break;
              }
            }
          }
        }


      }
    }

    return periodos;
  }

  vendasPeriodoContinuo(periodos) {
    return new Observable(observer => {
      let vendasR = [];
      let requisicoes = [];

      for (let i = 0; i < periodos.length; i++) {
        requisicoes.push(VendasPeriodo.getAll([new Query("dataInicio", "==", periodos[i]["dataInicio"]), new Query("dataTermino", "==", periodos[i]["dataTermino"])]));
      }

      if (requisicoes.length > 0) {

        forkJoin(requisicoes).subscribe(vendasPeriodos => {
          for (let i = 0; i < vendasPeriodos.length; i++) {
            if (vendasPeriodos[i][0] != undefined) {
              vendasR.push(vendasPeriodos[i][0]);
            }
          }
          observer.next(vendasR);
          observer.complete();
        })
      }
    })
  }

  calcularMediaCategoriaPorPeriodos(periodos) {
    //let contagemVendas = {}
    let contagemVendas = []
    for (let i = 0; i < periodos.length; i++) {
      if (periodos[i]["categorias"] != undefined) {
        for (let categoria in periodos[i]["categorias"]) {
          // SE NÃO TIVER CATEGORIA, INSERE
          let semCategoria = true;
          for (let j = 0; j < contagemVendas.length; j++) {
            if (contagemVendas[j].categoria == categoria) {
              semCategoria = false;
              contagemVendas[j].totalVendas = contagemVendas[j].totalVendas + periodos[i]["categorias"][categoria];
              break;
            }
          }
          if (semCategoria) {
            contagemVendas.push({ categoria: categoria, totalVendas: periodos[i]["categorias"][categoria] })
          }

        }

      }
    }

    for (let j = 0; j < contagemVendas.length; j++) {
      if (contagemVendas[j].totalVendas != undefined) {
        contagemVendas[j].media = Math.ceil(contagemVendas[j].totalVendas / periodos.length)//contagemVendas[categoria]["totalMeses"]);
      }
    }

    function compare(a, b) {
      if (a.media < b.media) {
        return 1;
      }
      if (a.media > b.media) {
        return -1;
      }
      return 0;
    }

    contagemVendas.sort(compare);


    return contagemVendas;
  }

  vendas(periodos: any[]) {

    return new Observable(observer => {
      let vendasR = [];
      let requisicoes = [];


      // TODO: Salvar o período no BANCO, e fazer a consulta nele antes de tentar pegar da Internet.
      const repos = this.httpRequestVendas("https://api.tagplus.com.br/vendas?page=1&per_page=400&fields=data_confirmacao,itens&access_token=").pipe(
        expand(({ next }) => next ? this.httpRequestVendas(next) : EMPTY)
      );
      repos.subscribe(vendas => {
        if (vendas.vendas != undefined)
          vendasR = vendasR.concat(vendas.vendas);
      }, err => { }, () => {

        //let v = new Venda(null, vendasR, { dataInicio: { dia: dataInicio["dia"], mes: dataInicio.mes, ano: dataInicio.ano }, dataTermino: { dia: dataTermino["dia"], mes: dataTermino.mes, ano: dataTermino.ano } }).save().subscribe(resultado => {

        let vendasAgrupadasPorPeriodo = this.agruparPorPeriodos(vendasR, periodos);

        this.agruparVendasPorCategoria(vendasAgrupadasPorPeriodo).subscribe(produtosAgrupados => {





          for (let i = 0; i < produtosAgrupados["length"]; i++) {
            let a = new VendasPeriodo(null, produtosAgrupados[i]["dataInicio"], produtosAgrupados[i]["dataTermino"], produtosAgrupados[i]["categorias"]);
            requisicoes.push(a.save());
          }

          if (requisicoes.length > 0) {
            forkJoin(requisicoes).subscribe(r => {
              observer.next(produtosAgrupados);
              observer.complete();
            })
          }



          //let vendasCategoria = this.totalVendasPorCategoria(vendasR, produtosAgrupados);
        })

      });


      // }






    })
  }
}
