<template>
    <v-container>
     <v-row class="text-center">    
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Crear Hotel</h1>       
      </v-col>     
    </v-row>
    <v-row>
    <v-col>
        <form v-on:submit.prevent="saveHotel()">
        <v-text-field v-model="hotel.name"
                label="Nombre"
                outlined
                required   
        >
        </v-text-field>
         <v-text-field
                v-model="hotel.city"        
                label="Ciudad"
                type="text"                
                outlined
                required        
            ></v-text-field>
            <v-text-field
                v-model="hotel.num_rooms"        
                label="Numero de Habitaciones"
                type="number"
                outlined
                required        
            ></v-text-field>
            <v-text-field
                v-model="hotel.adress"        
                label="Direccion"
                type="text"
                outlined
                required
            ></v-text-field>
            <v-text-field
                v-model="hotel.nit"        
                label="Nit"
                type="number"
                outlined
                required
            ></v-text-field>
            <v-card-actions>
                <v-btn color="deep-purple darken-3" class="mr-4" type="submit">Guardar</v-btn>      
            </v-card-actions>
        </form>
    </v-col>
    </v-row>

    </v-container>
</template>
<script>
import axios from 'axios';
import swal from 'sweetalert';
export default {
    name:'createHotel',
    data(){
        return{
            hotel:{
                name:'',
                city:'',
                num_rooms:'',
                adress:'',
                nit:''
            }
        };
    },
    methods:{
        saveHotel(){
            var router = this.$router;
           const formData = new FormData();
                 formData.append('name',this.hotel.name);
                formData.append('city',this.hotel.city);
                formData.append('num_rooms',this.hotel.num_rooms);
                formData.append('adress',this.hotel.adress);
              
          
           axios.post('http://0.0.0.0/api/hotel',formData)
           .then(()=>{
               router.push('/hoteles');
           })
           .catch(function(error){
             let er = error.response.data.errors;
              let mensaje = "Error no identificado";
             if(er.name){
                    mensaje = er.name[0];
             }
                if(er.city){
                    mensaje = er.city[0];
                }
                if(er.num_rooms){
                    mensaje = er.num_rooms[0];
                }
                if(er.adress){
                    mensaje = er.adress[0];
                }
                if(er.nit){
                    mensaje = er.nit[0];
                }
                swal("Error", mensaje, "error");
              });

        }
    }
}
</script>