## Scripts

Here are the available scripts in `package.json` and what they do:

- **`bun dev`**: Starts the development server.
- **`bun build`**: Builds the application for production.
- **`bun start`**: Starts the production server.
- **`bun lint`**: Runs ESLint to catch code quality issues.
- **`bun prettier`**: Checks file formatting with Prettier.
- **`bun format`**: Fixes linting issues and formats code with Prettier.
- **`bun prepare`**: Sets up Husky for git hooks.
- **`bun fresh-install`**: Reinstalls dependencies from scratch (useful for troubleshooting).

## Local Development (No Docker)

To run the project locally without Docker, follow these steps:

1.  **Install dependencies**:

    ```bash
    bun install
    # or
    pnpm install
    # or
    npm install
    # or
    yarn install
    ```

2.  **Run the development server**:

    ```bash
    bun run dev
    # or
    pnpm dev
    # or
    npm run dev
    # or
    yarn dev
    ```

3.  **Open the app**:
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Changelog Generation

To generate the Changelog, I use the following workflow:

1.  **Generate a diff of the last 4 commits (excluding lockfiles)**:

    ```bash
    git diff HEAD~4 HEAD -- . ':!package-lock.json' ':!yarn.lock' > revision.diff
    ```

2.  **Get the commit messages**:

    ```bash
    git log -n 4 --pretty=format:"- %s"
    ```

3.  **Use the output in an AI prompt**:
    Use the content of `revision.diff` and the commit messages with the following prompt:

    > "Actúa como un Lead Technical Writer. Analiza el código en el archivo abierto (revision.diff) y genera una entrada para el CHANGELOG.
    >
    > Instrucciones de análisis:
    >
    > Identifica qué cambió funcionalmente (no me digas 'se cambió la línea 40', dime 'se corrigió la validación del formulario').
    >
    > Agrupa los cambios lógicamente.
    >
    > Formato de Salida Obligatorio: Sigue estrictamente esta estructura Markdown. Si una categoría no tiene cambios, omítela.
    >
    > Markdown
    >
    > ## [vX.Y.Z] - YYYY-MM-DD
    >
    > ✨ Agregado (Added)
    > [Nombre del Módulo/Componente]: Descripción breve del cambio funcional.
    >
    > 🐛 Corregido (Fixed)
    > [Scope]: Descripción del error que se solucionó.
    >
    > ♻️ Cambios / Refactor (Changed)
    > Detalles técnicos relevantes o cambios de lógica existente.
    >
    > **Notas finales:**
    > Usa lenguaje conciso.
    >
    > Usa negritas para el alcance (scope) del cambio.
    >
    > No inventes información que no esté en el código."
