package ciclo3.doctor.servicios;

import ciclo3.doctor.entidades.Cliente;
import ciclo3.doctor.repositorios.RepositorioCliente;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
    
/**
 * Comentario que indica que se trata de una clase de servicio.
 * Determina los servicios para gestionar los clientes.
 */
@Service
public class ServiciosCliente {

    /**
     * Anotación que permite inyectar unas dependencias con otras dentro de Spring.
     */
    @Autowired
    private RepositorioCliente metodosCrud;
    
    /**
     * Servicio que maneja la consulta (READ-GET) de todos los registros en la tabla. 
     */
    public List<Cliente> getAll() {
        return metodosCrud.getAll();
    }

    /**
     * Servicio que maneja la consulta (READ-GET) de un registro en la tabla. 
     */
    public Optional<Cliente> getClient(int clientId) {
        return metodosCrud.getCliente(clientId);
    }
    
    /**
     * Servicio que maneja la creación o guardado (CREATE-POST) de nuevos registros en la tabla. 
     */
    public Cliente save(Cliente client) {
        if (client.getIdClient() == null) {
            return metodosCrud.save(client);
        } else {
            Optional<Cliente> cliente = metodosCrud.getCliente(client.getIdClient());
            if (cliente.isEmpty()) {
                return metodosCrud.save(client);
            } else {
                return client;
            }
        }
    }
    
    /**
     * Servicio que maneja la actualización (UPDATE-PUT) de registros existentes en la tabla. 
     */
    public Cliente update(Cliente client) {
        if (client.getIdClient() != null) {
            Optional<Cliente> cli = metodosCrud.getCliente(client.getIdClient());
            if (!cli.isEmpty()) {
                if (client.getName() != null) {
                    cli.get().setName(client.getName());
                }
                if (client.getAge() != null) {
                    cli.get().setAge(client.getAge());
                }
                if (client.getPassword() != null) {
                    cli.get().setPassword(client.getPassword());
                }
                return metodosCrud.save(cli.get());
            } else {
                return client;
            }
        } else {
            return client;
        }
    }
    
    /**
     * Servicio que maneja la eliminación (DELETE) de registros existentes en la tabla. 
     */
    public boolean deleteClient(int clientId) {
        Boolean aBoolean = getClient(clientId).map(client -> {
            metodosCrud.delete(client);
            return true;
        }).orElse(false);
        return aBoolean;
    }

}
