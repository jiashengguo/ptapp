import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { PtAppAstType, Person } from './generated/ast.js';
import type { PtAppServices } from './pt-app-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: PtAppServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.PtAppValidator;
    const checks: ValidationChecks<PtAppAstType> = {
        Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class PtAppValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
