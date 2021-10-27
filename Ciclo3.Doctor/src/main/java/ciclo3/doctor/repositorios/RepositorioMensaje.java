package ciclo3.doctor.repositorios;

import ciclo3.doctor.interfaces.InterfaceMensaje;
import ciclo3.doctor.entidades.Mensaje;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RepositorioMensaje {

    @Autowired
    private InterfaceMensaje crud;

    public List<Mensaje> getAll() {
        return (List<Mensaje>) crud.findAll();
    }

    public Optional<Mensaje> getMessage(int id) {
        return crud.findById(id);
    }

    public Mensaje save(Mensaje message) {
        return crud.save(message);
    }

    public void delete(Mensaje message) {
        crud.delete(message);
    }

}
