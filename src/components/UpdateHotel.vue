<template>
  <v-container>
    <v-row class="text-center">    
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Actualizar Hotel</h1>       
      </v-col>     
    </v-row>
    <v-row>
        <v-col>         
            <form v-on:submit.prevent="updateHotel()">
           
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
export default {
    name:'editarArticulo',
    mounted(){
      this.id = this.$route.params.id;
      console.log(this.$route);
      axios.get('https://damp-retreat-18356.herokuapp.com/api/hotel/?id='+this.id)
      .then(r =>{
        this.hotel = r.data;
      })
      .catch(function(error){
        console.log(error);
      });
    },
    data(){
      return{
        id:null,
        hotel:{
          name:'',
           city:'',
          num_rooms:'',
            adress:'',
            nit:''
        }
      }
    },
    methods:{
      updateHotel(){
         var router =  this.$router;
        axios.put('https://damp-retreat-18356.herokuapp.com/api/hotel/'+this.id,
        {
          name:this.hotel.name,
          city:this.hotel.city,
          num_rooms:this.hotel.num_rooms,
          adress:this.hotel.adress,
          nit:this.hotel.nit
        })
        .then(function(){
           router.push('/hoteles'); 
        })
        .catch(function(error){
        console.log(error);
        });
      }
    }
}
</script>