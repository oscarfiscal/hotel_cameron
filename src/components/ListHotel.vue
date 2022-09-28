<template>
    <v-container>
    <v-row class="text-center">      
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">
          Listado de Hoteles
        </h2>       
      </v-col>        
    </v-row>
    <v-row>
    <v-col class="mb-1">
       <v-btn :to="{name:'createHotel'}" class="mx-2" fab dark color="indigo">
         <v-icon dark>mdi-plus</v-icon>
       </v-btn>
    </v-col>
        <v-col class="mb-1">
            <!-- modal para asignar habitaciones -->
     <template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Asignar Habitaciones 
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Asignar Habitaciones</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                v-model="room.amount"
                  label="Cantidad*"
                  required
                  type="number"
                ></v-text-field>
              </v-col>
             
           
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                    v-model="room.type_room"
                  :items="['Estandar','Junior']"
                  label="Tipo de Habitacion*"
                ></v-autocomplete>
              </v-col>
                <v-col
                    cols="12"
                    sm="6"
                >
                  <v-autocomplete
                    v-model="room.accommodation"
                  :items="['Sencilla','Triple','Doble']"
                  label="Acomodacion*"
                ></v-autocomplete>
                </v-col>

                <v-col
                    cols="12"
                    sm="6"
                >
                <!-- mostrar los hoteles -->
                <v-autocomplete
                    v-model="room.hotel_id"
                  
                    :items="hotels.map(hotel => hotel.data)"
                    item-text="attributes.name" 
                    item-value="hotel_id"
                   
                    label="Hotel*"

                ></v-autocomplete>
                </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
           @click="assignedRoom"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
    </v-col>
    </v-row>
    <v-row class="text-center">
    <v-col cols="12">
        <v-simple-table fixed-header class="elevation-3">
        <template v-slot:default>
        <thead>
            <tr>
           <!--  <th class="text-center">ID</th> -->
            <th class="text-center">Nombre</th>
            <th class="text-center">Ciudad</th>
            <th class="text-center">Numero Habitaciones</th>
            <th class="text-center">Direccion</th>
            <th class="text-center">Nit</th>
          
            <th class="text-center">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="hotel in hotels" :key="hotel.id">
                <td>{{hotel.data.attributes.name}}</td>
                <td>{{hotel.data.attributes.city}}</td>
                <td>{{hotel.data.attributes.num_rooms}}</td>
                <td>{{hotel.data.attributes.adress}}</td>
                <td>{{hotel.data.attributes.nit}}</td>
              
                <td>
                    <v-btn  @click="updateHotel(hotel.data.hotel_id)" fab small color="primary"><v-icon>mdi-pencil</v-icon></v-btn>
                   
                </td>
            </tr>
         </tbody>   
        </template>
        </v-simple-table>
    </v-col>
    </v-row>

    </v-container>
</template>
<script>
import axios from 'axios';
import swal from 'sweetalert';
export default {
    name:'listHotel',
    mounted(){
        this.obtenerArticulos();
    },
    data(){
        return{            
            dialog:false,
            hotels:null,
            id:null,
            snackbar:false,
            textsnack:'¡Registro Eliminado!',
             room:{
                amount: '',
                type_room: '',
                accommodation: '',
                hotel_id: '',
            }
        }
    },
    methods:{
        obtenerArticulos(){
            axios.get('http://0.0.0.0/api/hotel')
            .then(r => {
                this.hotels = r.data.data;
                console.log(this.hotels);
            })
            .catch(function(error){
                console.log(error);
            })

        },
        assignedRoom(){
         
           var router = this.$router;
           const formData = new FormData();
                 formData.append('amount',this.room.amount);
                  formData.append('type_room',this.room.type_room);
                  formData.append('accommodation',this.room.accommodation);
                  formData.append('hotel_id',this.room.hotel_id);
             
            axios.post('http://0.0.0.0/api/room',formData)
            .then(r => {
                console.log(r);
                this.dialog = false;
                this.snackbar = true;
                router.go();
            })
            .catch(function(error){
            
               let er = error.response.data.errors;
                let msj = error.response.data.message;
                swal("Error", msj, "error");
                let mensaje = "Error no identificado";
                if(er.amount){
                    mensaje = er.amount[0];
                }
                if(er.type_room){
                    mensaje = er.type_room[0];
                }
                if(er.accommodation){
                    mensaje = er.accommodation[0];
                }
                if(er.hotel_id){
                    mensaje = er.hotel_id[0];
                }
             
                 swal("Error", mensaje, "error");
            })
                  }
        },
      
}
</script>