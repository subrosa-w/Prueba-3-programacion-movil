import { TestBed } from '@angular/core/testing';
import { EmailService } from './email.service';
import emailjs from 'emailjs-com';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send an email successfully', async () => {
    // Simula el comportamiento de emailjs.send
    const mockResponse = Promise.resolve({ status: 200, text: 'OK' });
    spyOn(emailjs, 'send').and.returnValue(mockResponse);

    const emailData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'Hello, this is a test email.',
    };

    const result = await service.sendEmail(emailData); // Ejecuta el método
    expect(result).toBeTruthy(); // Verifica que haya sido exitoso
    expect(emailjs.send).toHaveBeenCalledTimes(1); // Asegúrate de que emailjs.send se haya llamado
  });
});
