import {useForm} from "react-hook-form";

export function UserCreate() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    const onSubmit = data => {
        let user= {
            "id": null,
            "name": data.name,
            "email": data.email,
            "website": data.website,
        }
        
    }

    return(
        <div>
            <h2>create new user</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name</label>
                    <input type="text" {...register("name")}/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" {...register("email")}/>
                </div>
                <div>
                    <label>Website</label>
                    <input type="text" {...register("website")}/>
                </div>
                <input type="submit"/>
            </form>
        </div>
    );
}