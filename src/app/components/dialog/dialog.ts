import Swal from 'sweetalert2';

export function showAlert(): Promise<any> {
    return Swal.fire({
        title: "User doesn't exist!",
        text: "Do you want to create a new one?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, create it!",
        allowEscapeKey : false,
        allowOutsideClick : false,
        allowEnterKey : false
    });
}

export function showSuccesAlert(): Promise<any> {
    return Swal.fire({
        title: "Well done!",
        text: "Operation completed successfully.",
        icon: "success",
        allowEscapeKey : false,
        allowOutsideClick : false,
        allowEnterKey : false
    });
}

export function showAlertSignOut(): Promise<any> {
    return Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Sign out!",
        allowEscapeKey : false,
        allowOutsideClick : false,
        allowEnterKey : false
    });
}

export function showAlertDeleteUser(): Promise<any> {
    return Swal.fire({
        title: "Are you sure?",
        text: "This action can not be reverted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete!",
        allowEscapeKey : false,
        allowOutsideClick : false,
        allowEnterKey : false
    });
}