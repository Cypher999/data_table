class data_table{
  constructor(elemen,ind){
    this.element=elemen;
    this.search_box=""
    this.current_page=1;
    this.table_id="";
    this.max_page=0;
    this.max_content=5;
    this.table_head=[];
    this.table_body=[];
    this.index=ind;
    this.get_head();
    this.get_body();
    this.show_data();
  }
  get_head(){
    let table_head=this.element.getElementsByTagName('thead')[0].getElementsByTagName('tr');
    for(let x=0;x<table_head.length;x++){
      this.table_head.push(table_head[x].innerHTML);
    }
  }
  get_body(){
    let page=1
    let cur=0;
    if(this.table_body.length==0){
      let table_body=this.element.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
      for(let x=0;x<table_body.length;x++){
        if(cur>=this.max_content){
          page++;
          cur=0;
        }
        let container={page:page,body:table_body[x].innerHTML};
        this.table_body.push(container);
        cur++;
      }
      console.log(this.table_body);
      this.max_page=page;
    }
    else{
      if(this.search_box.length==0){
        for(let x=0;x<this.table_body.length;x++){
          if(cur>=this.max_content){
            page++;
            cur=0;
          }
          this.table_body[x].page=page;
          cur++;
        }
        console.log(this.table_body);
        this.max_page=page;
      }
      else{
        for(let x=0;x<this.table_body.length;x++){
          let isi_tabel=this.table_body[x].body.split("<td>").join("");
          isi_tabel=isi_tabel.split("</td>");
          let teks_cari=this.search_box.toUpperCase();
          for(var y=0;y<isi_tabel.length;y++){
            isi_tabel[y]=isi_tabel[y].split("/n").join("");
            isi_tabel[y]=isi_tabel[y].split("/n").join("");
            console.log(isi_tabel[y].toUpperCase().indexOf(teks_cari));
            if(isi_tabel[y].toUpperCase().indexOf(teks_cari)>-1){
              if(cur>=this.max_content){
                page++;
                cur=0;
              }
              this.table_body[x].page=page;
              cur++;

              break;
             }
             else{
               this.table_body[x].page=0;
             }
          }
        }
        console.log(this.table_body);
        this.max_page=page;
      }

    }

  }
  show_data(){
    var head="";
    head+="<div class='limit-container'>Show<select class='max-item'>";
    for(var z=5;z<=50;z+=5){
      if(z==this.max_content){
        head+="<option value="+z+" selected>"+z+"</option>";
      }
      else{
        head+="<option value="+z+">"+z+"</option>";
      }
    }
    head+="</select>Item</div>";
    if(this.search_box.length==0){
    head+="<div class='search-container'><input class='table-search' placeholder='cari'></div>";
    }
    else{
      head+="<input class='table-search' placeholder='cari' value='"+this.search_box+"'>";
    }
    head+="<div class='table-container'><table><tr><thead>";
    for(var x=0;x<this.table_head.length;x++){
      head+=this.table_head[x];
    }
    head+="</thead></tr><tbody>";
    for(var y=0;y<this.table_body.length;y++){
      if(this.table_body[y].page==this.current_page){
       head+="<tr>"+this.table_body[y].body+"</tr>";
       }
    }
    head+="</table></div>";
    head+="<div class='table-control' style='margin-top:10px;margin-bottom:10px;'>"
    head+="<div class='prev' style='padding:5px;border:solid black 1px'> << </div>";
    head+="<div class='cur_page' style='padding:5px;border:solid black 1px'>"+this.current_page+"</div>";
    head+="<div class='next' style='padding:5px;border:solid black 1px'> >> </div></div>";
    this.element.innerHTML=head;
    let ini=this;
    document.getElementsByClassName('max-item')[this.index].addEventListener('change',function(){ini.set_max_content(this)});
    document.getElementsByClassName('prev')[this.index].addEventListener('mouseup',function(){ini.prev()});
    document.getElementsByClassName('next')[this.index].addEventListener('mouseup',function(){ini.nxt()});
    document.getElementsByClassName('table-search')[this.index].addEventListener('change',function(){ini.search_data(this)});
  }
  search_data(elemen){
    this.search_box=elemen.value;
    this.current_page=1;
    this.get_body();
    this.show_data();
  }
  set_max_content(elemen){
    this.current_page=1;
    this.max_content=elemen.value;
    this.get_body();
    this.show_data();
  }
  prev(){
    this.current_page--;
    if(this.current_page<=0){
      this.current_page=1;
    }
    this.show_data();
  }
  nxt(){
    this.current_page++;
    if(this.current_page>this.max_page){
      this.current_page=this.max_page;
    }
    this.show_data();
  }
}
let elemen_data_table=document.getElementsByClassName('data-table')
let isi_data_tabel=[]
for(let x=0;x<elemen_data_table.length;x++){
   isi_data_tabel.push(new data_table(elemen_data_table[x],x));
}
