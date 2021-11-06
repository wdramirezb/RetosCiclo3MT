package ciclo3.doctor.controladores;

import ciclo3.doctor.entidades.Especialidad;
import ciclo3.doctor.servicios.ServiciosEspecialidad;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/Specialty")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ControladorEspecialidad {

    @Autowired
    private ServiciosEspecialidad servicio;

    @GetMapping("/all")
    public List<Especialidad> getEspecialidad() {
        return servicio.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Especialidad> getEspecialidad(@PathVariable("id") int cspecialidadId) {
        return servicio.getEspecialidad(cspecialidadId);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Especialidad save(@RequestBody Especialidad cspecialidad) {
        return servicio.save(cspecialidad);
    }

    ///RETO 4
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Especialidad update(@RequestBody Especialidad cspecialidad) {
        return servicio.update(cspecialidad);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Especialidad update(@PathVariable("id") int cspecialidadId, @RequestBody Especialidad cspecialidad) {
        return servicio.update(cspecialidad);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int cspecialidadId) {
        return servicio.deletecspecialidad(cspecialidadId);
    }

}
